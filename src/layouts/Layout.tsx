import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Navbar from '@/layouts/Navbar';
import Sidebar from '@/layouts/Sidebar';
import useDialogStore from '@/store/useDialogStore';

export default function Layout({
  children,
  viewSidebar = true,
  viewNavbar = true,
}: {
  children: React.ReactNode;
  viewSidebar?: boolean;
  viewNavbar?: boolean;
}) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========

  return (
    <div className='overflow-hidden'>
      {viewNavbar && <Navbar />}
      {viewSidebar && <Sidebar />}
      {children}
      <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
    </div>
  );
}
