const symbols = ['🍎', '🍌', '🍒', '🍇', '🥑', '🍍', '🍉', '🍓'];
        let cards = [...symbols, ...symbols];
        let flippedCards = [];
        let matchedCards = 0;
        let attempts = 0;

        function initializeGame() {
            cards.sort(() => Math.random() - 0.5);
            const board = document.getElementById("board");
            board.innerHTML = ''; // Clear previous cards
            cards.forEach(symbol => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.dataset.symbol = symbol;
                card.addEventListener("click", flipCard);
                board.appendChild(card);
            });
            attempts = 0;
            matchedCards = 0;
            document.getElementById("attempts").textContent = attempts;
        }

        function flipCard() {
            if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
                this.classList.add("flipped");
                this.textContent = this.dataset.symbol;
                flippedCards.push(this);
                
                if (flippedCards.length === 2) {
                    checkMatch();
                }
            }
        }

        function checkMatch() {
            attempts++;
            document.getElementById("attempts").textContent = attempts;
            
            let [card1, card2] = flippedCards;
            if (card1.dataset.symbol === card2.dataset.symbol) {
                card1.classList.add("matched");
                card2.classList.add("matched");
                matchedCards += 2;
                flippedCards = [];
                if (matchedCards === cards.length) {
                    setTimeout(() => alert("You Win!"), 500);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                    card1.textContent = "";
                    card2.textContent = "";
                    flippedCards = [];
                }, 1000);
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            initializeGame();
            document.getElementById("resetButton").addEventListener("click", initializeGame);
        });