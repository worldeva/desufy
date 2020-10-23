const { React } = require('powercord/webpack');
const { TextInput, SwitchItem } = require('powercord/components/settings');

module.exports = ({ getSetting, updateSetting, toggleSetting }) => (
  <div>
    <TextInput
      note='The domain used for the Hastebin server.'
      defaultValue={getSetting('domain', ', desu')}
      required={true}
      onChange={val => updateSetting('domain', val.endsWith('/') ? val.slice(0, -1) : val)}
    >
      Domain
    </TextInput>
  </div>
);