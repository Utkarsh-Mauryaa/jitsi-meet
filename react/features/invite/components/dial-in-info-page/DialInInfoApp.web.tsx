import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import { isMobileBrowser } from '../../../base/environment/utils';
import i18next from '../../../base/i18n/i18next';
import { parseURLParams } from '../../../base/util/parseURLParams';
import { DIAL_IN_INFO_PAGE_PATH_NAME } from '../../constants';
import DialInSummary from '../dial-in-summary/web/DialInSummary';

import NoRoomError from './NoRoomError.web';


let _root: Root | null = null;

/**
 * TODO: This seems unused, so we can drop it.
 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('react');

    if (container) {
        // @ts-ignore
        const { room } = parseURLParams(window.location, true, 'search');
        const { href } = window.location;
        const ix = href.indexOf(DIAL_IN_INFO_PAGE_PATH_NAME);
        const url = (ix > 0 ? href.substring(0, ix) : href) + room;

        /* eslint-disable-next-line react/no-deprecated */
        if (_root) {
            _root.render(
                <I18nextProvider i18n = { i18next }>
                    {room
                        ? <DialInSummary
                            className = 'dial-in-page'
                            clickableNumbers = { isMobileBrowser() }
                            room = { decodeURIComponent(room) }
                            url = { url } />
                        : <NoRoomError className = 'dial-in-page' />}
                </I18nextProvider>
            );
        } else {
            _root = createRoot(container);
            _root.render(
                <I18nextProvider i18n = { i18next }>
                    {room
                        ? <DialInSummary
                            className = 'dial-in-page'
                            clickableNumbers = { isMobileBrowser() }
                            room = { decodeURIComponent(room) }
                            url = { url } />
                        : <NoRoomError className = 'dial-in-page' />}
                </I18nextProvider>
            );
        }

    } else {
        console.error('Root container with Id react not found.');
    }
});

window.addEventListener('beforeunload', () => {
    /* eslint-disable-next-line react/no-deprecated */
    if (_root) {
        _root.unmount();
        _root = null;
    }
});
