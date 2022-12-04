import React, { MutableRefObject, useImperativeHandle, useRef, useState } from 'react';
import { Button, Dropdown, Input, Menu, Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { ReportParamsType, UseAction } from '@/Comment/components/type';
import { useRequest } from 'ahooks';
import { LangKit } from '@/_utils';
import { ID } from '@/Utils/interface';

const Index: React.FC<{
  id: ID;
  useAction: UseAction;
}> = ({ id, useAction, ...props }) => {
  let reportRef = useRef<any>();

  let onAction: any = {
    jubao: () => reportRef?.current?.show(),
  };


  return (<>
    <Dropdown overlay={
      <Menu onClick={({ key }) => onAction[key]?.()} items={[{ label: '举报', key: 'jubao' }]} />
    }>
      <Button
        size={'small'}
        type='link'
        icon={<MoreOutlined />}
      />
    </Dropdown>
    <ReportModal reportRef={reportRef} id={id} useAction={useAction} />
  </>);
};


let ReportModal: React.FC<{
  reportRef?: MutableRefObject<{
    show: () => void;
  }>;
  useAction: UseAction;
  id: ID;
}> = ({ id, useAction, ...props }: any) => {
  let [reason, setReason] = useState<string>();
  let [visible, setVisible] = useState<boolean>(false);
  let { loading, run } = useRequest<any, [ReportParamsType]>(LangKit.nilService(useAction.report), {
    manual: true,
    onSuccess: (res) => Modal.success({
      title: '举报成功',
      content: '感谢您的举报，我们会尽快处理',
    }),
  });
  useImperativeHandle(props?.reportRef, () => ({
    show: () => setVisible(true),
  }));

  let onOk = () => {
    let reasonStr = `${reason}`;
    if (reasonStr.trim().length === 0) {
      Modal.error({
        title: '举报失败',
        content: '举报原因不能为空',
      });
      return;
    }
    run({
      commentId: id,
      reason: reasonStr,
    });
    setVisible(false);
  };
  return <Modal title='举报' visible={visible}
                onCancel={setVisible.bind(this, false)} onOk={onOk}
                confirmLoading={loading}>
    <Input.TextArea onChange={(e) => setReason(e?.target?.value)}
                    autoSize={{ minRows: 4, maxRows: 6 } as any} showCount
                    placeholder='👊 举报原因..' />
  </Modal>;
};

export default Index;
