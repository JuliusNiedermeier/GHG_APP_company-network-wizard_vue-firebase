export default function emitAction(context, type, payload) {
  context.emit("action", { type, payload });
}
