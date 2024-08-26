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
  stable var dogecoinInfo : Text = "Dogecoin is a cryptocurrency featuring a Shiba Inu dog from the popular 'Doge' Internet meme. It was created in 2013 as a joke but has since gained a significant following and has been used for various charitable causes. Despite its humorous origins, Dogecoin has become a serious player in the cryptocurrency market, known for its friendly community and low transaction fees.";

  stable var memeUrls : [Text] = [
    "https://fakeimg.pl/600x400?text=Doge+Meme+1",
    "https://fakeimg.pl/600x400?text=Doge+Meme+2",
    "https://fakeimg.pl/600x400?text=Doge+Meme+3",
    "https://fakeimg.pl/600x400?text=Doge+Meme+4",
    "https://fakeimg.pl/600x400?text=Doge+Meme+5"
  ];

  stable var articles : [(Text, Text, ?Int)] = [
    ("The History of Dogecoin", "Dogecoin was created in 2013 by software engineers Billy Markus and Jackson Palmer. What started as a joke quickly gained traction in the cryptocurrency community. The Shiba Inu dog from the 'Doge' meme became the face of this new digital currency, appealing to a wide audience with its lighthearted approach to crypto. Despite its humorous beginnings, Dogecoin has since become a significant player in the cryptocurrency market, demonstrating the power of community and the unpredictable nature of digital currencies. Its journey from a meme to a widely recognized cryptocurrency is a testament to the evolving landscape of digital finance and the influence of internet culture on economic systems.", ?1609459200),
    ("Dogecoin's Technology Explained", "Despite its meme origins, Dogecoin uses sophisticated blockchain technology similar to other cryptocurrencies. It's based on Litecoin's codebase and uses a Scrypt algorithm for its proof-of-work mechanism. This means that, like Bitcoin and Litecoin, new Dogecoins are created through mining. However, unlike Bitcoin, Dogecoin has no cap on the number of coins that can be produced. This inflationary model was initially seen as a drawback but has been argued to encourage spending rather than hoarding. The blockchain technology behind Dogecoin ensures fast transaction times and low fees, making it practical for small, everyday transactions. While it may have started as a joke, the underlying technology of Dogecoin is robust and continues to be maintained and improved by a dedicated team of developers.", ?1614556800),
    ("The Dogecoin Community", "One of the strongest aspects of Dogecoin is its vibrant and active community. Known for their friendliness and charitable efforts, Dogecoin enthusiasts have been involved in numerous philanthropic projects. The community has raised funds for various causes, including sponsoring the Jamaican bobsled team to attend the Winter Olympics and providing clean water in developing countries. This spirit of giving has become a defining characteristic of the Dogecoin community, setting it apart from other cryptocurrency communities that may be more focused on investment and profit. The welcoming nature of the Dogecoin community has also played a crucial role in introducing newcomers to the world of cryptocurrency, making it less intimidating for those unfamiliar with blockchain technology.", ?1619827200),
    ("Dogecoin in Popular Culture", "Dogecoin's journey from an internet meme to a recognized cryptocurrency has been marked by several notable moments in popular culture. Celebrities like Elon Musk have publicly endorsed Dogecoin, often causing significant price movements with their tweets. The cryptocurrency has been featured in mainstream media, discussed on popular talk shows, and even mentioned in TV series and movies. This cultural penetration has helped Dogecoin maintain relevance and attract new users, even during cryptocurrency market downturns. The meme-friendly nature of Dogecoin has made it particularly popular among younger generations, who appreciate its blend of humor and financial potential.", ?1625097600),
    ("The Future of Dogecoin", "As Dogecoin continues to evolve, its future remains a topic of much speculation and interest. While some skeptics argue that its lack of a fixed supply and meme-based origins limit its long-term viability, supporters point to its strong community, increasing adoption, and potential for real-world use cases. There have been discussions about potential upgrades to the Dogecoin blockchain to enhance its functionality and efficiency. Some proponents envision Dogecoin becoming a widely used currency for online transactions and tipping, leveraging its fast transaction times and low fees. Whether Dogecoin will achieve these ambitions remains to be seen, but its journey so far has defied many expectations and continues to challenge traditional notions of value and currency in the digital age.", ?1630454400)
  ];

  stable var priceHistory : [(Int, Float)] = [
    (1609459200, 0.004681),
    (1614556800, 0.05),
    (1619827200, 0.30),
    (1625097600, 0.25),
    (1630454400, 0.29)
  ];

  stable var faqs : [(Text, Text)] = [
    ("What is Dogecoin?", "Dogecoin is a cryptocurrency that started as a joke based on the 'Doge' meme. It has since grown into a significant digital currency with a large community of users and supporters."),
    ("How does Dogecoin work?", "Dogecoin operates on a blockchain, similar to Bitcoin. Transactions are verified by network participants (miners) and recorded on the public ledger."),
    ("Is Dogecoin a good investment?", "Like all cryptocurrencies, Dogecoin is a speculative investment. Its value can be volatile, and potential investors should do thorough research and consider their risk tolerance before investing."),
    ("How can I buy Dogecoin?", "Dogecoin can be purchased on various cryptocurrency exchanges. Popular options include Binance, Kraken, and Coinbase."),
    ("What can I do with Dogecoin?", "Dogecoin can be used for online transactions, tipping content creators, charitable donations, and as a store of value. Some businesses also accept Dogecoin as payment for goods and services.")
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

  public query func getFAQs() : async [(Text, Text)] {
    faqs
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
