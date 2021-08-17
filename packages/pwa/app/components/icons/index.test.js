/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * *
 * Copyright (c) 2021 Mobify Research & Development Inc. All rights reserved. *
 * * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import React from 'react'
import {within} from '@testing-library/dom'
import {renderWithProviders} from '../../utils/test-utils'
import * as Icons from './index'

test('renders svg icons with Chakra Icon component', () => {
    renderWithProviders(<Icons.CheckIcon />)
    const svg = document.querySelector('.chakra-icon')
    const use = within(svg).getByRole('presentation')
    expect(svg).toBeInTheDocument()
    expect(use).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(use).toHaveAttribute('xlink:href', '#check')
})