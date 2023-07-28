import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(){
  const navigate = useNavigate();

  function getCookie(name: string){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    };
  };

  useEffect(() => {
    const token = getCookie('token');

    // OLD: 'http://152.67.42.101:4008/tokenverify'

    const urlTokenVerify = `http://152.67.42.101:4008/tokenverify?token=${token}`;

    const optionsFetch = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: '',
    };

    fetch(urlTokenVerify, optionsFetch)
      .then(response => {
        console.log(response);
        if(response.status === 404 || response.status === 422){
          navigate('/login');
        };
      })
      .catch(error => {
        console.error(error);
        navigate('/login');
      });
  }, [navigate]);

  return null;
};