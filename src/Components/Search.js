import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap';

export default function Search() {
    return (
        <Form>
            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                Username
            </Form.Label>
            <InputGroup>
                <Form.Control className="shadow-none"
                    id="inlineFormInputGroupUsername"
                    placeholder="Username"
                />
                <Button className='btn btn-dark'>Поиск</Button>
            </InputGroup>
        </Form>
    )
}
