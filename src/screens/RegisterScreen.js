import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Text, Button, TextInput } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [visible, setVisible] = useState(false);
  const { isLoading, register } = useContext(AuthContext);

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          mode='outlined'
          style={styles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
          activeOutlineColor='royalblue'
        />
        <TextInput
          mode='outlined'
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
          activeOutlineColor='royalblue'
        />
        <TextInput
          mode='outlined'
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          activeOutlineColor='royalblue'
          secureTextEntry={!visible}
          right={
            <TextInput.Icon
              icon={visible ? 'eye' : 'eye-off'}
              onPress={toggleVisibility}
            />
          }
        />
        <TextInput
          mode='outlined'
          style={styles.input}
          value={passwordConfirmation}
          placeholder="Enter password again"
          onChangeText={text => setPasswordConfirmation(text)}
          activeOutlineColor='royalblue'
          secureTextEntry={!visible}
          right={
            <TextInput.Icon
              icon={visible ? 'eye' : 'eye-off'}
              onPress={toggleVisibility}
            />
          }
        />
        <Button onPress={() => {
          register(name, email, password, passwordConfirmation);
        }} mode="contained" buttonColor='royalblue' textColor='white'>REGISTER</Button>
        <View style={{ flexDirection: 'row', marginTop: 12, padding: 0 }}>
          <Text>Already have an accoutn? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
  },
  link: {
    color: 'royalblue',
    fontWeight: 'bold'
  },
});

export default RegisterScreen;