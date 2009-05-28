<?php
/**
 * Unit test
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
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */
require_once 'PHPUnit/Framework.php';

class Customized_Project extends Project_Models_Project
{
    public function validatePriority($value)
    {
        if ($value > 0) {
            return null;
        } else {
            return 'Bad priority';
        }
    }
}

/**
 * Tests for items
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Gustavo Solt <solt@mayflower.de>
 */
class Phprojekt_Item_AbstractTest extends PHPUnit_Framework_TestCase
{
    /**
     * setUp method for PHPUnit. We use a shared db connection
     */
    public function setUp()
    {
        $this->_emptyResult = array();

        $this->_formResult = array(
            'projectId' => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'title' => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'notes'     => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'startDate' => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'endDate' => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'priority'  => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'currentStatus' => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'completePercent' => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => ''),
            'budget' => array(
                'id'                => '',
                'tableName'         => '',
                'tablefield'        => '',
                'formTab'           => '',
                'formLabel'         => '',
                'formType'          => '',
                'formPosition'      => '',
                'formColumns'       => '',
                'formRegexp'        => '',
                'formRange'         => '',
                'defaultValue'      => '',
                'listPosition'      => '',
                'listAlign'         => '',
                'listUseFilter'     => '',
                'altPosition'       => '',
                'status'            => '',
                'isInteger'         => '',
                'isRequired'        => '',
                'isUnique'          => '')
        );

        $this->_listResult = array(
            'title'           => $this->_formResult['title'],
            'startDate'       => $this->_formResult['startDate'],
            'endDate'         => $this->_formResult['endDate'],
            'priority'        => $this->_formResult['priority'],
            'currentStatus'   => $this->_formResult['currentStatus'],
            'completePercent' => $this->_formResult['completePercent']
        );

        $this->_filterResult = array(
            'title'            => $this->_formResult['title'],
            'start_date'       => $this->_formResult['startDate'],
            'end_date'         => $this->_formResult['endDate'],
            'priority'         => $this->_formResult['priority'],
            'current_status'   => $this->_formResult['currentStatus'],
            'complete_percent' => $this->_formResult['completePercent']
        );
    }

    /**
     * Test set
     */
    public function testWrongSet()
    {
        $item = new Project_Models_Project(array('db' => $this->sharedFixture));
        $this->setExpectedException('Exception');
        $item->wrongAttribute = 'Hello World';
    }

    /**
     * Test set for required fields
     */
    public function testRequiredFieldSet()
    {
        $item            = new Project_Models_Project(array('db' => $this->sharedFixture));
        $item->projectId = 1;
        $item->title     = '';
        $item->notes     = 'TEST';
        $item->startDate = '1981-05-12';
        $item->priority  = 1;
        $item->recordValidate();
        $this->assertEquals(1, count($item->getError()));
    }

    /**
     * Test set for integer fields
     */
    public function testIntegerFieldSet()
    {
        $item           = new Project_Models_Project(array('db' => $this->sharedFixture));
        $item->priority = 'AA';
        $this->assertEquals(0, $item->priority);

        $item->priority = 7;
        $this->assertEquals(7, $item->priority);
    }

    /**
     * Test for get errors
     */
    public function testGetError()
    {
        $result   = array();
        $result[] = array('field'    => 'title',
                          'label'    => 'Title',
                          'message'  => 'Is a required field');
        $item = new Project_Models_Project(array('db' => $this->sharedFixture));
        $item->getError();
        $this->assertEquals(array(), $item->getError());

        $item->projectId = 1;
        $item->title     = '';
        $item->notes     = 'TEST';
        $item->startDate = '20-';
        $item->endDate   = '1981-05-12';
        $item->priority  = 1;
        $item->recordValidate();
        $this->assertEquals($result, $item->getError());
    }

    /**
     * Test for validations
     */
    public function testRecordValidate()
    {
        $item        = new Project_Models_Project(array('db' => $this->sharedFixture));
        $item->title = '';
        $this->assertFalse($item->recordValidate());

        $item->projectId = 1;
        $item->title     = 'TEST';
        $item->notes     = 'TEST';
        $item->startDate = '1981-05-12';
        $item->endDate   = '1981-05-12';
        $item->priority  = 1;
        $this->assertTrue($item->recordValidate());

        $item            = new Customized_Project(array('db' => $this->sharedFixture));
        $item->projectId = 1;
        $item->title     = 'TEST';
        $item->notes     = 'TEST';
        $item->startDate = '1981-05-12';
        $item->endDate   = '1981-05-12';
        $item->priority  = 0;
        $this->assertFalse($item->recordValidate());
    }

    /**
     * Test date field
     */
    public function testDate()
    {
        $item            = new Project_Models_Project(array('db' => $this->sharedFixture));
        $item->startDate = 'aaaaaaaaaa';
        $this->assertEquals($item->startDate, null);

        $item->startDate = '1981-05-12';
        $this->assertEquals(array(), $item->getError());
    }

    /**
     * Test float values
     */
    public function testFloat()
    {
        Zend_Locale::setLocale('es_AR');
        $item         = new Project_Models_Project(array('db' => $this->sharedFixture));
        $item->budget = '1000,30';
        $item->budget;
    }

    /**
     * Test empty float values
     */
    public function testEmptyFloat()
    {
        Zend_Locale::setLocale('es_AR');
        $item         = new Project_Models_Project(array('db' => $this->sharedFixture));
        $item->budget = '';
    }

    /**
     * Test time
     */
    public function testTime()
    {
        $item            = new Calendar_Models_Calendar(array('db' => $this->sharedFixture));
        $item->startTime = '12:00:00';
        $this->assertEquals(array(), $item->getError());
        $this->assertEquals('12:00:00', $item->startTime);
    }

    /**
     * Test html
     */
    public function testHtml()
    {
        $item           = new Note_Models_Note(array('db' => $this->sharedFixture));
        $item->comments = '<b>HELLO</b>';
        $this->assertEquals(array(), $item->getError());
        $this->assertEquals('<b>HELLO</b>', $item->comments);
    }

    /**
     * Test multipleValues
     */
    public function testArray()
    {
        $item                      = new Minutes_Models_Minutes(array('db' => $this->sharedFixture));
        $item->participantsInvited = array(1,2,3);
        $this->assertEquals(array(), $item->getError());
        $this->assertEquals('1,2,3', $item->participantsInvited);
    }

    /**
     * Test filters data
     */
    public function testGetFieldsForFilter()
    {
        $module = new Project_Models_Project(array('db' => $this->sharedFixture));
        $array  = $module->getFieldsForFilter();
        $this->assertEquals(array_keys($this->_filterResult), $array);
    }

    /**
     * Test getRights function
     */
    public function testGetRights()
    {
        $module = new Project_Models_Project(array('db' => $this->sharedFixture));
        $module->find(2);

        $getRights = $module->getRights();
        $this->assertTrue($getRights['currentUser']['admin']);
        $this->assertEquals($getRights['currentUser']['userId'], '1');
        $this->assertEquals($getRights['currentUser']['write'], true);
        $this->assertEquals($getRights[3]['itemId'], 2);
        $this->assertEquals($getRights[3]['write'], true);

        $module = new Timecard_Models_Timecard(array('db' => $this->sharedFixture));
        $this->assertEquals(array(), $module->getRights());
    }

    /**
     * Test delete function (with upload file)
     */
    public function testDelete()
    {
        $model              = new Helpdesk_Models_Helpdesk(array('db' => $this->sharedFixture));
        $model->title       = 'test';
        $model->projectId   = 1;
        $model->ownerId     = 1;
        $model->attachments = '3bc3369dd33d3ab9c03bd76262cff633|LICENSE';
        $model->status      = 3;
        $model->author      = 1;
        $model->save();
        $this->assertNotNull($model->id);

        $id = $model->id;
        $model->delete();
        $model->find($id);
        $this->assertNull($model->title);
    }

    public function testSaveRights()
    {
        $model = new Helpdesk_Models_Helpdesk(array('db' => $this->sharedFixture));
        $model->title       = 'test';
        $model->projectId   = 1;
        $model->ownerId     = 1;
        $model->attachments = '3bc3369dd33d3ab9c03bd76262cff633|LICENSE';
        $model->status      = 3;
        $model->author      = 1;
        $model->save();
        $model->saveRights(array(1 => 255));
        $rights = Phprojekt_Loader::getLibraryClass('Phprojekt_Item_Rights');
        $this->assertEquals(255, $rights->getItemRight(10, $model->id, 1));

        $this->assertEquals(0, $rights->getItemRight(10, $model->id, 10));
    }

    /**
     * Test the current function
     */
    public function testCurrent()
    {
        $model = new Project_Models_Project(array('db' => $this->sharedFixture));
        $model->find(1);
        foreach ($model as $key => $field) {
            if ($key == 'id') {
                $this->assertEquals('1', $field->value);
            }
            if ($key == 'title') {
                $this->assertEquals('Invisible Root', $field->value);
            }
        }
    }
}
