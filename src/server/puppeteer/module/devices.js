import { KnownDevices } from "puppeteer";

export default (req, res) => {
    res.send(Object.values(KnownDevices));
}