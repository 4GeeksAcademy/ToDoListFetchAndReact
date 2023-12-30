import React, { useEffect, useState } from "react";
//include images into your bundle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

//create your first component
const Home = () => {
	const [valorinput, setValorInput] = useState("Tarea nueva");
	const [porhacer, setPorhacer] = useState([""]);

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/rosangelM', {
			method: "PUT",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
			  console.log(resp.status); // el código de estado = 200 o código = 400 etc.
			  console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
			  return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		  })
		  .then(data => {
			  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			  console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
		  })
	  
		  .catch(error => {
	  
			  //manejo de errores
	  
			  console.log(error);
	  
		  });
	})
	const agregarTarea= ()=> {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/rosangelM', {
      method: "PUT",
      body: JSON.stringify(porhacer),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })

    .catch(error => {

        //manejo de errores

        console.log(error);

    });
}

	const deleteTarea = (index) => {
		const nuevaTarea = porhacer.filter((texto, i) => i !== index)
		setPorhacer(nuevaTarea);
	}
	const handleChange = (e) => {
		setValorInput(e.target.value);
	}
	const handleOnKeydown = (e) => {
		if (e.code === "Enter") {
			setPorhacer([valorinput, ...porhacer]);
		}
	}
	return (
		<div className="List">
			<h1>My To Do List</h1>
			<ul>
				<li>
					<input
						type="text"
						placeholder="What needs to be done?"
						onChange={(e) => {
							handleChange(e);
						}}
						onKeyDown={(e) => {
							handleOnKeydown(e);
						}}>
					</input>
					<button onClick={() => agregarTarea()}>Add task</button>
				</li>
				{porhacer.map((texto, index) => {
					return (
						<li>{texto}<button onClick={() => deleteTarea(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
						</li>

					)
				})}
			</ul>
			<div>{porhacer.length} Item left</div>
		</div>
	);
};

export default Home;
