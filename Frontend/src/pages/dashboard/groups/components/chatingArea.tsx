import { Button, Card, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import services from "../../../../services";
import CreateGroupModal from "./createGroup.modal";

const ChatingArea = (props: { sideBarChatChild: any; chatAreaChild: any }) => {
  const { sideBarChatChild, chatAreaChild } = props;
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        className="m-4"
        onClick={() => {
          setOpenCreateGroupModal(true);
        }}
      >
        Create Group
      </Button>
      <Card style={{ height: "75vh" }} className="  dark:!bg-navy-800">
        <Row>
          <Col md={8} xl={8}>
            <div
              style={{ height: "66vh" }}
              className="shadow-3xl overflow-y-auto   rounded-md"
            >
              {sideBarChatChild}
            </div>
          </Col>
          <Col md={16} xl={16} className="p-2 ">
            {chatAreaChild}
          </Col>
        </Row>
      </Card>
      {openCreateGroupModal && (
        <CreateGroupModal
          open={openCreateGroupModal}
          setOpen={setOpenCreateGroupModal}
        />
      )}
    </div>
  );
};

export default ChatingArea;
