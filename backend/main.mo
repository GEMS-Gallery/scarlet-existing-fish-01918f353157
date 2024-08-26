import Random "mo:base/Random";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Int "mo:base/Int";

actor {
  // Stable variables
  stable var dogecoinInfo : Text = "Dogecoin is a cryptocurrency featuring a Shiba Inu dog from the popular 'Doge' Internet meme.";
  stable var memeUrls : [Text] = [
    "https://fakeimg.pl/600x400?text=Doge+Meme+1",
    "https://fakeimg.pl/600x400?text=Doge+Meme+2",
    "https://fakeimg.pl/600x400?text=Doge+Meme+3",
    "https://fakeimg.pl/600x400?text=Doge+Meme+4",
    "https://fakeimg.pl/600x400?text=Doge+Meme+5"
  ];
  stable var articles : [(Text, Text, ?Int)] = [
    ("The History of Dogecoin", "Dogecoin was created in 2013 as a joke...", ?1609459200),
    ("Dogecoin's Technology Explained", "Despite its meme origins, Dogecoin uses blockchain technology...", ?1614556800),
    ("The Dogecoin Community", "One of the strongest aspects of Dogecoin is its community...", ?1619827200)
  ];
  stable var priceHistory : [(Int, Float)] = [
    (1609459200, 0.004681),
    (1614556800, 0.05),
    (1619827200, 0.30)
  ];

  // Public query functions
  public query func getDogecoinInfo() : async Text {
    dogecoinInfo
  };

  public query func getRandomMemes(count : Nat) : async [Text] {
    let shuffled = Array.tabulate<Text>(memeUrls.size(), func (i) {
      let j = Int.abs(Time.now()) % Nat.fromInt(memeUrls.size());
      if (i == j) { memeUrls[i] } else { memeUrls[j] }
    });
    Array.subArray(shuffled, 0, Nat.min(count, shuffled.size()))
  };

  public query func getArticles() : async [(Text, Text, ?Int)] {
    articles
  };

  public query func getDogecoinPriceHistory() : async [(Int, Float)] {
    priceHistory
  };

  // Helper function to generate a random float between min and max
  private func randomFloat(min : Float, max : Float) : Float {
    let random = Float.fromInt(Int.abs(Time.now()) % 1000) / 1000.0;
    min + (random * (max - min))
  };

  // Update function to simulate price changes (for demonstration purposes)
  public func updatePrice() : async () {
    let currentTime = Time.now();
    let newPrice = randomFloat(0.1, 1.0);
    priceHistory := Array.append(priceHistory, [(currentTime, newPrice)]);
    if (priceHistory.size() > 100) {
      priceHistory := Array.subArray(priceHistory, priceHistory.size() - 100, 100);
    };
  };
}
