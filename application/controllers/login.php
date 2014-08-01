<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->load->view('headerView');
        $this->load->view('loginView');
        $this->load->view('footerView');
    }

    public function dologin(){
        $registrationJSON = json_decode($_REQUEST['login']);

        //PREPARE DATA MODEL FOR
        $dataModel = array();
        $dataModel['EMAIL'] = $registrationJSON->email;
        $dataModel['PASSWORD'] = $registrationJSON->password;

        $this->load->model('loginmodel');
        $res = $this->loginmodel->login($dataModel);

        if($res){
            echo json_encode(array("status"=>"success", "description"=>"login done successfully", "data"=>$res[0]));
        }
        else{
            echo json_encode(array("status"=>"error", "description"=>"email or password not matched"));
        }

        //print_r($registrationJSON);
    }

}

