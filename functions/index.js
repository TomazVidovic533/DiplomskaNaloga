const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);
admin.initializeApp();
exports.userSignUp = functions.auth.user().onCreate((newUser) => {
  return admin.firestore().collection("users").doc(newUser.uid).set({
    email: newUser.email,
    avatar: newUser.photoURL,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    name: newUser.displayName,
    is_pro_member: false,
  });
});

exports.userDelete = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection("users").doc(user.uid).delete();
});

exports.purchaseProMembership = functions.https.onCall(async (data, context) =>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "eur",
        product_data: {
          name: "Chatster PRO Membership",
          images: ["https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
        },
        unit_amount: 999,
      },
      quantity: 1,
    },
    ],
    metadata: {userId: context.auth.uid},
    mode: "payment",
    success_url: "https://chatsterv2.web.app/app/people/"+context.auth.uid,
    cancel_url: "https://chatsterv2.web.app/app/home",
  });
  return session.id;
});


exports.onSuccessfullPayment = functions.https.onRequest(async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        functions.config().stripe.payment_webhook_secret,
    );
  } catch (err) {
    return res.sendStatus(400);
  }
  const payment = event.data.object;
  await admin.firestore()
      .collection("users")
      .doc(payment.metadata.userId)
      .collection("payments")
      .add({
        checkoutSessionId: payment.id,
        paymentStatus: payment.payment_status,
        shippingInfo: payment.shipping,
        amountTotal: payment.amount_total,
      });
  await admin.firestore().collection("users")
      .doc(payment.metadata.userId)
      .update({
        is_pro_member: true,
      });
  return res.sendStatus(200);
});


