export default async function keepAwake() {
  await (navigator as any).wakeLock.request("screen");
}
