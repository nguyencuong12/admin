import React, { useState, useEffect } from "react";
import { Button, PasswordInput } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import styled from "styled-components";
// import { Auth_API } from "../../api";
// import SweetAlert2 from "../../utils/sweetAlert";
const LoginWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 80px;
`;
const LoginContent = styled.form`
  min-width: 400px;
  max-width: 400px;
  border: 2px solid #cccc;
  padding: 10px;
`;
const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      router.push("/");
    }
  }, []);
  const [formData, setFormData] = useState({});

  const onChangeForm = (e: any, type: string) => {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  };
  const onSubmit = async () => {
    const response = await Auth_API.login(formData);
    if (response) {
      localStorage.setItem("access_token", response.data.access_token);
      //   SweetAlert2.loginSuccess();
      //   router.push("/");
    }
  };
  return (
    <LoginWrapper>
      <LoginContent
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            onSubmit();
          }
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>Sashi</span>
          meomeo{" "}
        </h2>
        <TextInput
          placeholder="Your name"
          label="Full name"
          required
          onChange={(e) => {
            onChangeForm(e, "username");
          }}
        />
        <br />
        <PasswordInput
          placeholder="Password"
          label="Password"
          description="Password"
          required
          onChange={(e) => {
            onChangeForm(e, "password");
          }}
        />
        <br />
        <Button
          autoFocus={true}
          fullWidth
          onKeyDown={() => {
            console.log("AC");
          }}
          onClick={() => {
            onSubmit();
          }}
        >
          Login
        </Button>

        <br />
      </LoginContent>
    </LoginWrapper>
  );
};

export default LoginPage;
