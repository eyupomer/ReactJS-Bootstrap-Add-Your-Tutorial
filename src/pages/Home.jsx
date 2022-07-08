import AddTutorial from '../components/AddTutorial';
import TutorialList from '../components/TutorialList';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  const [tutorials, setTutorials] = useState();

  const url = 'https://tutorials-api-cw.herokuapp.com/api/tutorials';

  //! GET (Read)
  const getTutorials = async () => {
    try {
      const { data } = await axios.get(url);
      setTutorials(data);
    } catch (error) {
      console.log(error);
    }
  };

  //? Sadece Component mount oldugunda istek yapar
  useEffect(() => {
    getTutorials();
  }, []);

  console.log(tutorials);

  //! POST (Create)
  const addTutorial = async (tutorial) => {
    try {
      await axios.post(url, tutorial);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  //! DELETE (delete)
  const deleteTutorial = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  //! Update (PUT:Whole Update,PATCH :Partially Update)
  const editTutorial = async (id, title, desc) => {
    //! Bu kisma gerek yok aslinda degistirmek istedigimiz
    //! veriler alt componentten geliyor. Dolayısiyla
    //! dogurdan axios istegini gonderebiliriz
    // const filtered = tutorials
    //   .filter((tutor) => tutor.id === id)
    //   .map((item) => ({ title: title, description: desc }));

    // console.log(filtered);
    try {
      await axios.put(`${url}/${id}`, { title, description: desc });
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  return (
    <>
      <AddTutorial addTutorial={addTutorial} />
      <TutorialList
        tutorials={tutorials}
        deleteTutorial={deleteTutorial}
        editTutorial={editTutorial}
      />
    </>
  );
};

export default Home;
