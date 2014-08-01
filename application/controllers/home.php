<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

    public function index()
    {
        $this->load->view('headerView');
        $this->load->view('homeView');
        $this->load->view('footerView');
    }
}

