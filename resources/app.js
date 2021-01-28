// functie de validare pentru input - sa contina doar litere
function valid_text(input_string)
{   validate=true;
	for(i=0;i<input_string.length;i++)
	 if (!((input_string[i]>='a' && input_string[i]<='z') ||
	 ( input_string[i]>='A' && input_string[i]<='Z') ))
		validate=false;
	return validate;

}
// EventListener la apasarea butonului Submit - face conversia datelor de intrare in string-uri
document.getElementById('submit').addEventListener('click', 
	function() 
	{
		let formData = new FormData (document.querySelector('#form-id'))
		for (var pair of formData.entries())
			{
			if(pair[0]=='pokemon id')
				if(pair[1] != '')
					{
					//console.log(pair[0]+' '+pair[1]);
					var pokeId=String(pair[1]);
					}
			if(pair[0]=='pokemon name')
				if(pair[1] != '')
				{
				//console.log(pair[0]+' '+pair[1]);
				var pokeName=String(pair[1]);
				}		
			}

		if (pokeId != '' & typeof(pokeId) ==='string')
		{
	//console.log(typeof(pokeId))
	//console.log('executa ramura cu pokeid');
		PokemonGo(pokeId)
		}
			else 
			if (pokeName != '' & typeof(pokeName) ==='string')
			{
				if(valid_text(pokeName))
					PokemonGo(pokeName)
				else 
				// afisarea unei erori in cazul in care string-ul "choose by name" contine 
				//alte tipuri de caractere decat a-z,A-Z.
					alert("Pokemon name incorrect"); 
			}
	}
)

// dupa fiecare submit, se golesc field-urile din input
let btnClear = document.querySelector('button');
let inputs = document.querySelectorAll('input');
 
btnClear.addEventListener('click', () => {
inputs.forEach(input =>  input.value = '');
});

// functia prin care apelam API si aducem la fiecare submit input nou
// se insereaza fiecare element (h1,img si ul->li).
function PokemonGo(index){
	let body = document.querySelector('.card');
	let inputText = document.querySelector('#search');
	let form = document.getElementById('form-id');
	let title = document.getElementById('h1');
	let pokeImage = document.getElementById('image');
	let skillsList_elem1 = document.getElementById('li_1');
	let skillsList_elem2 = document.getElementById('li_2');
	let skillsList_elem3 = document.getElementById('li_3');
	let skillsList_elem4 = document.getElementById('li_4');
	let skillsList_elem5 = document.getElementById('li_5');
	let inputText2 = document.getElementById('search').value;
	//console.log(index)
	fetch('https://pokeapi.co/api/v2/pokemon/'+ index)
		.then(response => response.json())
		.then(json => {
			console.log(json);
			let name = json.name;
			let sprite = json.sprites.other["official-artwork"].front_default; //am folosit imaginile din artwork, sunt mai bine realizate
			let moves = json.moves;

			title.innerHTML = `${name.toUpperCase()}`;
			pokeImage.src = sprite;
			//console.log(pokeImage);
			skillsList_elem1.innerHTML=moves[0].move.name;
			skillsList_elem2.innerHTML=moves[1].move.name;
			skillsList_elem3.innerHTML=moves[2].move.name;
			skillsList_elem4.innerHTML=moves[3].move.name;
			skillsList_elem5.innerHTML=moves[4].move.name;
			//console.log(skillsList);
	
	})
	.catch(err => {
		//afisarea mesajului de eroare in cazul in care numarul 
		//sau numele pokemonului nu a fost gasit
		alert("Pokemon not found! Try another number or name!"); 
	})

}
