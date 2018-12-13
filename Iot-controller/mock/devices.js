//@ts-check

const { DeviceType } = require("../../utils/Interfacce/DeviceType");
const { DeviceState } = require("../../utils/Interfacce/DeviceState");

exports.getall = () => {
  return [
    {
      type: DeviceType.Binary.type,
      id: 0x23
    },
    {
      type: DeviceType.Modulable.type,
      id: 0x32
    }
  ];
};

exports.getstate = async id => {
  return {
    id: id,
    type: DeviceType.Binary.type,
    state: DeviceState.Busy.state
  };
};
