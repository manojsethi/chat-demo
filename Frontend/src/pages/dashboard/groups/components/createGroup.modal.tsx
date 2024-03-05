import { Button, Card, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect } from "react";

function CreateGroupModal({ open, setOpen }: any) {
  const [form] = useForm();

  useEffect(() => {
    console.log('hi')
    return () => {
    console.log('bye')

      form.resetFields();
    };
  }, []);
  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      onOk={() => {
        form.submit();
      }}
      title="Create Group"
      okButtonProps={{
        title: "Submit",
        type: "primary",
      }}
    >
      <Card>
        <Form
          form={form}
          onFinish={() => {}}
          onFinishFailed={(err) => {
            console.log(err, "error");
          }}
        >
          <div>
            <label>Name</label>
            <FormItem name={"name"} required>
              <Input />
            </FormItem>
            <label>About</label>
            <FormItem name={"about"} required>
              <Input />
            </FormItem>

            <label>Select members</label>
            <FormItem name={"members"}>
              <Select mode="multiple">
                <Select.Option key={1} value={1}>
                  User 1
                </Select.Option>
                <Select.Option key={2} value={2}>
                  User 2
                </Select.Option>
              </Select>
            </FormItem>
          </div>
        </Form>
      </Card>
    </Modal>
  );
}

export default CreateGroupModal;
