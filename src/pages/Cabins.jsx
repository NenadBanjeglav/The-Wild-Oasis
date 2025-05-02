import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const data = await getCabins(); // This is already the parsed data
        console.log(data);
      } catch (err) {
        console.error("Error fetching cabins:", err);
      }
    };

    handleFetchData();
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://akjkrldfflwrzrghpquw.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg"
        alt="cabin 1"
      />
    </Row>
  );
}

export default Cabins;
