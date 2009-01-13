<?php
/**
 * Login handling
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    $Id$
 * @author     Eduardo Polidor <soria_parra@mayflower.de>
 * @package    PHProjekt
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */

/**
 * Login handling
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @version    Release: @package_version@
 * @license    LGPL 2.1 (See LICENSE file)
 * @package    PHProjekt
 * @subpackage Default
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Eduardo Polidor <epolidor@mayflower.de>
 */
class LoginController extends Zend_Controller_Action
{
    /**
     * Default error action
     *
     * @return void
     */
    public function indexAction()
    {
        $this->getResponse()->clearHeaders();
        $this->getResponse()->clearBody();

        $this->view->webpath        = Phprojekt::getInstance()->getConfig()->webpath;
        $this->view->compressedDojo = (bool) Phprojekt::getInstance()->getConfig()->compressedDojo;

        $this->render('login');
    }

    /**
     * Executes the login using the username and password provided on login form
     * If it works fine you will be redirect to homepage
     *
     * @todo redirect to the correct page
     *
     * @return void
     */
    public function loginAction()
    {
        $username = (string) $this->getRequest()->getParam('username', null);
        $password = (string) $this->getRequest()->getParam('password', null);

        $this->view->webpath        = Phprojekt::getInstance()->getConfig()->webpath;
        $this->view->compressedDojo = (bool) Phprojekt::getInstance()->getConfig()->compressedDojo;

        try {
            $success = Phprojekt_Auth::login($username, $password);
            if ($success === true) {
                $config = Phprojekt::getInstance()->getConfig();
                $this->_redirect($config->webpath.'index.php');
                die();
            }
        } catch (Phprojekt_Auth_Exception $error) {
            $this->view->message  = $error->getMessage();
            $this->view->username = $username;
        }
    }

    /**
     * Logout action
     *
     * @return void
     */
    public function logoutAction()
    {
        Phprojekt_Auth::logout();
        $config = Phprojekt::getInstance()->getConfig();
        $this->_redirect($config->webpath.'index.php/login/index');
        die();
    }
}
