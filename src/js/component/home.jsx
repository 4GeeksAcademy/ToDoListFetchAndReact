import React, { useEffect, useState } from "react";
//include images into your bundle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

//create your first component
const Home = () => {
	
	const [valorinput, setValorInput] = useState("");
	const [porhacer, setPorhacer] = useState([""]);

	//Creando usuario

	const crearUsuario = async () => {
		console.log("creando usuario");
		try {
			const url = 'https://playground.4geeks.com/apis/fake/todos/user/rosangelM'
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if (!response.ok) {
				throw new Error("Error request")
			}
			const resultado = await response.json()
			if (resultado.msg) {
				obtenerData()
			} else {
				obtenerData()
			}
		} catch (error) {
			console.log("Error creando usuario:", error)
		}
	};

	//METODO GET

	const obtenerData = () => {
		console.log("consultando datos")
		fetch('https://playground.4geeks.com/apis/fake/todos/user/rosangelM', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
				if (data.msg) {
					crearUsuario()
				} else {
					setPorhacer(data)
				}
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}
	useEffect(() => {
		obtenerData()
	},[])
	const agregarTarea = () => {
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
	};
	const deleteTarea = (index) => {
		const nuevaTarea = porhacer.filter((_,i) => i !== index)
		setPorhacer(nuevaTarea);
		agregarTarea();
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
			<div>
			</div>
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
				
				</li>
				{porhacer.map((texto, index) => {
					return (
						<li>{texto.label}<button onClick={() => deleteTarea(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
						</li>
					)
				})}
			</ul>
			<div>{porhacer.length} Item left</div>
		</div>
	);
};

export default Home;
//<button onClick={() => agregarTarea()}>Add task</button>

//<button onClick={obtenerData}>Crear</button>