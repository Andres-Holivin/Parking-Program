import { Button, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function CardType(params) {
    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={params.data.image}
                    alt={params.data.image}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{params.data.text}</Heading>
                    <Text>
                        {params.data.desc}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter display="flex" justifyContent="center">
                <Button onClick={() => window.location.href = `/${params.data.href}`} variant='solid' colorScheme='blue' size="lg">
                    {params.data.type}
                </Button>
            </CardFooter>
        </Card>
    )

};
