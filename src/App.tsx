import classes from './App.module.scss';
import Title from './components/Title';
import Form from './components/Form';
import Results from './components/Results';
import React, {useState} from "react";
import Loading from "./components/Loading";

type ResultsStateType={
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
}

function App() {
  const [loading,setLoading]=useState<boolean>(false);
  const [city,setCity]=useState<string>("");

  const [results,setResults]=useState<ResultsStateType>({
    country:"",
    cityName:"",
    temperature:"",
    conditionText:"",
    icon:""
  });

  const getWeather=(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setLoading(true);
      fetch(`https://api.weatherapi.com/v1/current.json?key=3f33447fff994a61b98133200213110&q=${city}&aqi=no`)
      .then(res=>res.json())
      .then(data=>{
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon
        })
        setCity("");
        setLoading(false)
      })
      .catch(err=>alert("エラーが発生しました。ページをリロードしてください。"))
  }
  return (
    <div className={classes.container}>
      <Title/>
      <div className={classes.box2}>
      
      <Form getWeather={getWeather} setCity={setCity} city={city}/>
      {loading ? <Loading/>:<Results results={results}/>}
      </div>
    </div>
  );
}

export default App;
