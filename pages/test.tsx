import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Box } from "@mantine/core";
import { DropboxComponent } from "../components";
function Demo() {
  const form = useForm({
    initialValues: {
      password: "secret",
      confirmPassword: "sevret",
      file: undefined,
    },
    // validate: {
    //   confirmPassword: (value, values) => (value !== values.password ? "Passwords did not match" : null),
    // },
  });
  const getDropFile = (file: any) => {
    form.setFieldValue("file", file);

    // setFormData({
    //   ...formData,
    //   ["image"]: file,
    // });
  };
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <PasswordInput label="Password" placeholder="Password" {...form.getInputProps("password")} />
        <PasswordInput mt="sm" label="Confirm password" placeholder="Confirm password" {...form.getInputProps("confirmPassword")} />
        <DropboxComponent callbackFunc={getDropFile}></DropboxComponent>

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
export default Demo;
