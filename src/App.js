import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup  from "yup"
import './App.css';

function App() {
 
  const schema = yup.object().shape({
    cardholderName: yup.string().required('please enter your card name'),
    cardNumber: yup.number().min(16).required('card number not complete'),
    password: yup.string().min(8).max(12).required('password should be aleast 8 character'),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'password does not match').required(),
    expiryMonth: yup.number().required('please enter correct date'),
    expiryYear: yup.number().required(),
    cvv: yup.number().required('please enter correct cvv')
  })

  const { register, handleSubmit , formState:{ errors }} = useForm({
     resolver: yupResolver(schema),
  });

  const onSubmit = (data) =>{
    console.log(data)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>CARDHOLDER NAME</label><br/>
        <input type="text" placeholder='eg Adam James' {...register("cardholderName")}/><br/>
       <small>{errors.cardholderName?.message}</small>
        <label>CARD NUMBER</label><br/>
        <input type="number" placeholder='eg 1234 5678 9123 0000'{...register("cardNumber")} /><br/>
        <small>{errors.cardNumber?.message}</small>
        <label>PASSWORD</label><br/>
        <input type="password" placeholder=' ********'  {...register("password")}/><br/>
        <small>{errors.password?.message}</small>
        <label>CONFIRM PASSWORD</label><br/>
        <input type="password" placeholder=' ********'  {...register("confirmPassword")}/><br/>
        <small>{errors.confirmPassword?.message}</small>
        <div className='date-cvv'>
        <div className='date'>
        <label>EXPIRY DATE</label><br/>
        <input type="number" placeholder=' MM' {...register("expiryMonth")} /> 
        <input type="number" placeholder=' YY' {...register("expiryYear")} /><br/>
        <small>{errors.expiryMonth?.message}</small>
        </div>
        <div className='cvv'>
        <label>CVV</label><br/>
        <input type="number" placeholder='eg 123'  {...register("cvv")}/>
        <small>{errors.cvv?.message}</small>
        </div>
        </div>
        <input type="submit" className='submit' value="CONFIRM"/>
      </form>
    </div>
  );
}

export default App;
