import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
} from '@nextui-org/react';
function CardPersonalitie({ name, text, bg, img }) {
  return (
    <Card>
      <Image src={img} height={200} width={200} />
      <CardBody>
        <h3>{name}</h3>
        <p>{text}</p>
      </CardBody>
    </Card>
  );
}

export default CardPersonalitie;
