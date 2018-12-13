const { DeviceState } = require("../../utils/Interfacce/DeviceState");
const { srvc } = require("../mock/statechange");

exports.do_the_thing = (devid, state) => {
  if (state === "on") {
    return srvc.send(devid, DeviceState.On);
  }
  if (state === "off") {
    return srvc.send(devid, DeviceState.Off);
  }
};
