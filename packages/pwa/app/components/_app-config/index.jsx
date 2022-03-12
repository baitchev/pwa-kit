/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {ChakraProvider} from '@chakra-ui/react'

// Removes focus for non-keyboard interactions for the whole application
import 'focus-visible/dist/focus-visible'

import theme from '../../theme'
import CommerceAPI from '../../commerce-api'
import {
    BasketProvider,
    CommerceAPIProvider,
    CustomerProductListsProvider,
    CustomerProvider
} from '../../commerce-api/contexts'
import {getPreferredCurrency} from '../../utils/locale'
import {resolveSiteFromUrl} from '../../utils/site-utils'
import {getLocaleFromSite, getParamsFromPath} from '../../utils/utils'
import {getConfig} from 'pwa-kit-react-sdk/ssr/universal/utils'

/**
 * Returns the validated locale ref parsed from the url.
 * @private
 * @param {object} locals the request locals (only defined when executing on the server.)
 * @param {object} site - the site to look for locale id
 * @returns {string|undefined} the locale short code
 */
const getLocale = (locals = {}, site) => {
    const path =
        typeof window === 'undefined'
            ? locals.originalUrl
            : `${window.location.pathname}${window.location.search}`
    const {localeRef} = getParamsFromPath(path)
    if (!localeRef) return
    const locale = getLocaleFromSite(site, localeRef)

    return locale?.id
}

/**
 * Use the AppConfig component to inject extra arguments into the getProps
 * methods for all Route Components in the app – typically you'd want to do this
 * to inject a connector instance that can be used in all Pages.
 *
 * You can also use the AppConfig to configure a state-management library such
 * as Redux, or Mobx, if you like.
 */
const AppConfig = ({children, locals = {}}) => {
    const [basket, setBasket] = useState(null)
    const [customer, setCustomer] = useState(null)

    return (
        <CommerceAPIProvider value={locals.api}>
            <CustomerProvider value={{customer, setCustomer}}>
                <BasketProvider value={{basket, setBasket}}>
                    <CustomerProductListsProvider>
                        <ChakraProvider theme={theme}>{children}</ChakraProvider>
                    </CustomerProductListsProvider>
                </BasketProvider>
            </CustomerProvider>
        </CommerceAPIProvider>
    )
}

AppConfig.restore = (locals = {}) => {
    const path =
        typeof window === 'undefined'
            ? locals.originalUrl
            : `${window.location.pathname}${window.location.search}`
    const site = resolveSiteFromUrl(path)

    const locale = getLocale(locals, site) || site.l10n.defaultLocale
    const currency =
        getPreferredCurrency(locale, site.l10n.supportedLocales) || site.l10n.defaultCurrency

    const {app: appConfig} = getConfig()
    const apiConfig = {
        ...appConfig.commerceAPI,
        einsteinConfig: appConfig.einsteinAPI
    }

    apiConfig.parameters.siteId = site.id

    locals.api = new CommerceAPI({...apiConfig, locale, currency})
}

AppConfig.freeze = () => undefined

AppConfig.extraGetPropsArgs = (locals = {}) => {
    return {
        api: locals.api
    }
}

AppConfig.propTypes = {
    children: PropTypes.node,
    locals: PropTypes.object
}

export default AppConfig
