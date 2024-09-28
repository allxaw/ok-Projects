const gameContainer = document.querySelector(".container")
const userResult = document.querySelector(".user-result img")
const computerResult = document.querySelector(".computer-result img")
const result = document.querySelector(".result")
const optionImages = document.querySelectorAll(".option-image")

optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) =>{
        image.classList.add("active");

        optionImages.forEach((image2, index2) =>{
            index !== index2 && image2.classList.remove("active");
        });

        
        gameContainer.classList.add("start");

        userResult.src = computerResult.src = "images/rock.png";
        result.textContent = "Wait...";


        let time = setTimeout(() =>{
            gameContainer.classList.remove("start");
            let imageSrc = e.target.querySelector("img").src;
        userResult.src = imageSrc;

        let randomNumber = Math.floor(Math.random() * 3);
        let compImages = ["images/rock.png","images/paper.png","images/scissors.png"];
        computerResult.src = compImages[randomNumber];

        let compValue = ["R","P","S"][randomNumber];
        let userValue = ["R","P","S"][index];

        let outcomes = {
            RR: "Draw",
            RP: "Computer",
            RS: "You",
            PP: "Draw",
            PR: "You",
            PS: "Computer",
            SS: "Draw",
            SR: "Computer",
            SP: "You",
        };
        let outComeValue = outcomes[userValue + compValue];

        result.textContent = userValue === compValue ? "Match Draw" : `${outComeValue} Won!!`;
        },2500)


    });
});
