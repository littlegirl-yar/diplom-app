import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, Checkbox } from 'react-native-paper';

const CheckBoxRow = ({ onPressOption, lable, optionValue, priceText }) => {

  const [checked, setChecked] = useState(false);

  const setCheckedOption = () => {
    onPressOption(optionValue, checked)
    setChecked(!checked)
  }

  return (
    <View>
      <TouchableRipple style={{ width: "100%" }} onPress={() => setCheckedOption()}>
        <View style={styles.checkBoxRow}>
          <Text>{lable} {`(+0.${priceText}$/h)`}</Text>
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