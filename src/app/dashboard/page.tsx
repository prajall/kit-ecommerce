import { redirect } from "next/navigation";
import { useState } from "react";

const Admin = () => {
  redirect("/dashboard/analytics");
  return null;
};

export default Admin;
