const loadData = (name="") => {
    
    
    return fetch(`http://127.0.0.1:3000?term=${name}`).then(resp => resp.json());


}

const renderGrid = (persons) => {

    const gridNode = document.querySelector(".grid")
    gridNode.innerHTML = persons.map(p => renderPerson(p)).join("")
}

function hendelPersonClick (e) {
    document.querySelector("#name").innerHTML = e.dataset.name
    document.querySelector("#phone").innerHTML = e.dataset.phone
    document.querySelector("#email").innerHTML = e.dataset.email
    document.querySelector("#hire_date").innerHTML = e.dataset.hire_date
    document.querySelector("#position_name").innerHTML = e.dataset.position_name
    document.querySelector("#department").innerHTML = e.dataset.department
    
    document.querySelector(".modal").classList.add("opened")
}



const renderPerson = (person) => {

    return `
    <div
    data-name='${person.name}'
    data-phone='${person.phone}'
    data-email='${person.email}'
    data-address='${person.address}'
    data-position_name='${person.position_name}'
    data-department='${person.department}'
    data-hire_date='${person.hire_date}'
    onclick = "hendelPersonClick(this)"
    class = "item">
        <div class = "content">
            
            <p class = "person-name">${person.name}</p>
            
            <p class = "telephone-number">

            <span id="cell-phone-icon" class="material-symbols-outlined">
                phone_iphone
            </span> 
            ${person.phone} 

            </p>
            
            <p class = "email"> 

            <span id="email-icon" class="material-symbols-outlined">
            mail
            </span>
            <a href="mailto:${person.email}"> ${person.email} </a>

            </p>

        </div>
    </div>
    `

}

const main = async () => {

    let data = await loadData();
    renderGrid(data);

    let searchInput = document.querySelector(".input");
    searchInput.addEventListener("input",(e) => {
        loadData(e.target.value).then(data => renderGrid(data));
    })

    document.querySelector(".modal").addEventListener("click", (e) => {
        e.target.classList.remove("opened");
    })

    document.querySelector(".close").addEventListener("click", (e) => {
        document.querySelector(".modal").classList.remove("opened");
        console.log("hui");
    } )

} 
window.addEventListener('load', main);
