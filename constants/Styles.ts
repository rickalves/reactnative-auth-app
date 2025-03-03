import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const Styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleInput: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'left',
    width:'100%',
  },
  input: {
    borderWidth:1,
    borderRadius:8,
    borderColor: Colors.primary,
    marginBottom: 15,
    padding: 10,
    width: '100%',
  },
  inputError: {
    borderColor: Colors.error,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: Colors.success,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
