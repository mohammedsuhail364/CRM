import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "crm",
});

const syncUser = inngest.createFunction(
  {
    id: "sync-user",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const newUser = {
      clerkId: id,
      userEmail: email_addresses[0].email_address,
      userName: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };
    await User.create(newUser);
    // todo : send a welcome email here later 
  }
);

const deleteUser = inngest.createFunction(
  {
    id: "delete-user-from-db",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;

    await User.deleteOne({clerkId:id});
  }
);

export const functions = [syncUser,deleteUser];