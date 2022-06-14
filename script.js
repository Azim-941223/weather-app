let key = '3156508244a5aaca0733f7d6e9a585d7'

// let url = `https://api.openweathermap.org/data/2.5/onecall?lat=42.88&lon=74.58&units=metric&&lang=ru&appid=${key}`


let city = [{lat: 42.88,lon: 74.58},{lat: 40.5140,lon: 72.8161},{lat: 42.4782,lon: 78.3956},{lat: 42.5318,lon: 72.2305},{lat: 41.4274,lon: 75.9841},{lat: 40.0548,lon: 70.8209},]



let $select = document.querySelector('select')  
console.log($select.selectedIndex)

let lon = city[0].lon
let lat = city[0].lat
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${key}`
manager(url)

$select.addEventListener('change', function(){
    console.log($select.selectedIndex)
    let index = $select.selectedIndex
    lat = city[index].lat
    lon = city[index].lon
    console.log(lat,lon)
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${key}`
    manager(url)
})



let $temp = document.querySelector('.temper')
let $descrip = document.querySelector('.descrip')
let $wind_km = document.querySelector('.wind_km')
let $dity = document.querySelector('.dity')
let $date = document.querySelector('.date')
let $img = document.querySelector('.sun')


let $info_time_weather = document.querySelector('.info_time_weather')
let $info_weather = document.querySelector('.info_weather')
let $toDay = document.querySelector('.toDay')


let $weatherToWeek = document.querySelector('#weatherToWeek')
let $first_page = document.querySelector('.first_page')
let $second_page = document.querySelector('.second_page')
let $back = document.querySelector('.back')

let $hours = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','19','20','21','22','23','24','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','19','20','21','22','23','24','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','19','20','21','22','23','24','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','19','20','21','22','23','24']



$weatherToWeek.addEventListener('click', function() {
    $first_page.style.display = 'none'
    $second_page.style.display = 'block'
})

$back.addEventListener('click', function(){
    $second_page.style.display = 'none'
    $first_page.style.display = 'block'
})

function manager(urlM){
    fetch(urlM)
    .then(resp => resp.json())
    .then(data =>{
        console.log(data)
            $temp.textContent=`${Math.floor(Number(data.current.temp))}°`
            $descrip.textContent = `${data.current.weather[0].description}`
            $wind_km.textContent = `${Math.ceil(Number(data.current.wind_speed))} км/ч`
            $date.textContent = new Date().toLocaleDateString('ru-RU', {day:'2-digit',month:'long'})
            $dity.textContent = `${data.current.humidity}%`
            $img.innerHTML = ''
            $img.insertAdjacentHTML('beforeend', `<img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="" />`)
            $toDay.textContent = new Date().toLocaleDateString('ru-RU', {day:'2-digit',month:'long'})
            $info_time_weather.innerHTML = ''
            data.hourly.forEach((element, i) => {
                // console.log(element)
                $info_time_weather.insertAdjacentHTML('beforeend', `
                <div class='info_time'> 
                    <h4>${Math.floor(Number(element.temp))}°C</h4>
                    <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                    <h4>${$hours[new Date().getHours() + i]}.00</h4>
                </div>`)
            });
            $info_weather.innerHTML = ''
            data.daily.forEach(element => {
                $info_weather.insertAdjacentHTML('beforeend', `
                <div class="date_weather">
                    <h3>${new Date(element.dt * 1000).toLocaleDateString('ru-ru', {weekday: 'short'})}</h3>
                    <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                    <h4>${Math.floor(Number(element.temp.day))} °</h4>
                </div>
                `)
            })
    })
}






