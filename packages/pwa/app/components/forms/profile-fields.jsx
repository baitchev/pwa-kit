/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * *
 * Copyright (c) 2021 Mobify Research & Development Inc. All rights reserved. *
 * * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import React from 'react'
import PropTypes from 'prop-types'
import {SimpleGrid, Stack} from '@chakra-ui/react'
import useProfileFields from './useProfileFields'
import Field from '../field'

const ProfileFields = ({form, prefix = ''}) => {
    const fields = useProfileFields({form, prefix})

    return (
        <Stack spacing={5}>
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={5}>
                <Field {...fields.firstName} />
                <Field {...fields.lastName} />
            </SimpleGrid>
            <Field {...fields.email} />
            <Field {...fields.phone} />
        </Stack>
    )
}

ProfileFields.propTypes = {
    /** Object returned from `useForm` */
    form: PropTypes.object.isRequired,

    /** Optional prefix for field names */
    prefix: PropTypes.string
}

export default ProfileFields