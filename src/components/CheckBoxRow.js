import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, Checkbox } from 'react-native-paper';

const CheckBoxRow = ({ onPressOption, lable, optionValue }) => {

  const [checked, setChecked] = useState(false);

  const setCheckedOption = () => {
    onPressOption(optionValue, checked)
    setChecked(!checked)
  }

  return (
    <View>
      <TouchableRipple style={{ width: "100%" }} onPress={() => setCheckedOption()}>
        <View style={styles.checkBoxRow}>
          <Text>{lable}</Text>
          <View pointerEvents="none">
            <Checkbox color='royalblue' uncheckedColor='royalblue' status={checked ? 'checked' : 'unchecked'} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    width: "100%"
  },
});

export default CheckBoxRow;