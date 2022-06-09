let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=42.88&lon=74.58&units=metric&&lang=ru&appid=3156508244a5aaca0733f7d6e9a585d7'

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

let $hours = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','19','20','21','22','23','24','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','19','20','21','22','23','24','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','19','20','21','22','23','24']

$weatherToWeek.addEventListener('click', function() {
    $first_page.style.display = 'none'
    $second_page.style.display = 'block'
})

$back.addEventListener('click', function(){
    $second_page.style.display = 'none'
    $first_page.style.display = 'block'
})



fetch(url)
    .then(resp => resp.json())
    .then(data =>{
        console.log(data)
            $temp.textContent=`${Math.floor(Number(data.current.temp))}°`
            $descrip.textContent = `${data.current.weather[0].description}`
            $wind_km.textContent = `${Math.ceil(Number(data.current.wind_speed))} км/ч`
            $date.textContent = new Date().toLocaleDateString('ru-RU', {day:'2-digit',month:'long'})
            $dity.textContent = `${data.current.humidity}%`
            $img.insertAdjacentHTML('beforeend', `<img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="" />`)
            $toDay.textContent = new Date().toLocaleDateString('ru-RU', {day:'2-digit',month:'long'})
            data.hourly.forEach((element, i) => {
                console.log(element)
                $info_time_weather.insertAdjacentHTML('beforeend', `
                <div class='info_time'> 
                    <h4>${Math.floor(Number(element.temp))}°C</h4>
                    <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                    <h4>${$hours[new Date().getHours() + i]}.00</h4>
                </div>`)
            });
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


