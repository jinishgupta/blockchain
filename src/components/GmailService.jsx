import { gapi } from "gapi-script";

export const GmailService = {
  markAsRead,
  sendEmail,
  starEmail,
  unstarEmail,
  moveToTrash,
  permanentlyDelete,
  markAsUnread,
};

// Mark an email as READ
async function markAsRead(messageId) {
  try {
    await gapi.client.gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      resource: {
        removeLabelIds: ["UNREAD"],
      },
    });
  } catch (err) {
    console.error("Failed to mark as read", err);
  }
}

// Mark an email as UNREAD
async function markAsUnread(messageId) {
  try {
    await gapi.client.gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      resource: {
        addLabelIds: ["UNREAD"],
      },
    });
  } catch (err) {
    console.error("Failed to mark as unread", err);
  }
}

// Send an email
async function sendEmail(to, subject, messageText) {
  try {
    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "",
      messageText,
    ].join("\n");

    const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gapi.client.gmail.users.messages.send({
      userId: "me",
      resource: {
        raw: base64EncodedEmail,
      },
    });
  } catch (err) {
    console.error("Failed to send email", err);
  }
}

// Star an email
async function starEmail(messageId) {
  try {
    await gapi.client.gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      resource: {
        addLabelIds: ["STARRED"],
      },
    });
  } catch (err) {
    console.error("Failed to star email", err);
  }
}

// Unstar an email
async function unstarEmail(messageId) {
  try {
    await gapi.client.gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      resource: {
        removeLabelIds: ["STARRED"],
      },
    });
  } catch (err) {
    console.error("Failed to unstar email", err);
  }
}

//  Move an email to trash
async function moveToTrash(messageId) {
  try {
    await gapi.client.gmail.users.messages.trash({
      userId: "me",
      id: messageId,
    });
  } catch (err) {
    console.error("Failed to move email to trash", err);
  }
}

// Permanently delete an email
async function permanentlyDelete(messageId) {
  try {
    await gapi.client.gmail.users.messages.delete({
      userId: "me",
      id: messageId,
    });
  } catch (err) {
    console.error("Failed to permanently delete email", err);
  }
}