import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import contactApi from "../../apis/contact.api";
import { RootState } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Contacts() {
  const navigate = useNavigate();
  const isLogin = useSelector(
    (state: RootState) => state.customerAuthReducer.isAuthenticate
  );

  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    content: "",
  });
  const [error, setError] = useState(new Map<string, string>());

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const validate = () => {
    let errors = new Map<string, string>();
    if (contact.full_name.length === 0) {
      errors.set("full_name", "Tên bắt buộc phải nhập không được để trống");
    }
    if (contact.email.length === 0) {
      errors.set("email", "Email bắt buộc phải nhập không được để trống");
    }
    if (contact.content.length === 0) {
      errors.set("content", "Nội dung bắt buộc phải nhập không được để trống");
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      navigate("/login");
    }
    const errorsValidate = validate();
    if (errorsValidate.size !== 0) {
      setError(errorsValidate);
    } else {
      contactApi.createContact(contact).then(() => {
        alert("Cảm ơn bạn đã phản hồi cho chúng tôi");
        navigate("/");
      });
    }
  };

  return (
    <>
      <h1 className="text-white text-center mt-3">Liên hệ với chúng tôi</h1>
      <br></br>
      <h4 className="text-danger text-center">
        Vui lòng nhập vào biểu mẫu bên dưới
      </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-white">
            Tên của bạn<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="full_name"
            type="text"
            placeholder="Nhập đầy đủ họ và tên của bạn"
            onChange={handleChange}
            value={contact.full_name}
          />
          <Form.Text className="text-danger">
            {error.get("full_name")}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-white">
            Email Của bạn <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={handleChange}
            value={contact.email}
          />
          <Form.Text className="text-danger">{error.get("email")}</Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3 text-white"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>
            Nội dung <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            value={contact.content}
            name="content"
            as="textarea"
            rows={3}
            onChange={handleChange}
          />
          <Form.Text className="text-danger">{error.get("content")}</Form.Text>
        </Form.Group>
        <Button type="submit" className="float-end m-1" variant="primary">
          Gửi
        </Button>
      </Form>
    </>
  );
}

export default Contacts;
