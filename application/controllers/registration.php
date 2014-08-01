<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Registration extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->load->view('headerView');
        $this->load->view('registrationView');
        $this->load->view('footerView');
    }

    public function doregistration(){
        $upload = $this->uploadfile();
        if($upload['status'] === 'success'){
            $registrationJSON = $_REQUEST;//json_decode($_REQUEST['registration']);

            //PREPARE DATA MODEL FOR
            $dataModel = array();
            $dataModel['NAME'] = $registrationJSON['name'];
            $dataModel['EMAIL'] = $registrationJSON['email'];
            $dataModel['PASSWORD'] = $registrationJSON['password'];
            $dataModel['PHONE_NUM'] = $registrationJSON['phone'];
            $dataModel['ADDRESS'] = $registrationJSON['address'];
            $dataModel['PHOTO_LOCATION'] = $upload['location'];

            $this->load->model('registrationmodel');
            $userID = $this->registrationmodel->registration($dataModel);
            //print_r($res->db->inser_id());

            if($userID){
                echo json_encode(array("status"=>"success", "description"=>"registration done successfully", "userID"=>$userID));
            }
            else{
                echo json_encode(array("status"=>"error", "description"=>"registration done successfully", "userID"=>$userID));
            }
        }else{
            $answer = array( 'status' => 'error', 'description'=>'File uploaded successfully','data'=>$_REQUEST );
            $json = json_encode( $answer );

            echo $json;
        }
        //print_r($registrationJSON);

    }

    function uploadfile(){
        if ( !empty( $_FILES ) ) {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];

            $file_name = uniqid();
            $file_extension = pathinfo(basename($_FILES['file']['name']));
            $uploadPath = 'media/'.$file_name.'.'.$file_extension['extension'];

            $moved = move_uploaded_file( $tempPath, $uploadPath );

            $answer = array( 'status' => 'success', 'description'=>'File uploaded successfully', 'location'=>$uploadPath );
            $json = json_encode( $answer );

            //echo $json;
            return $answer;

        } else {
            $answer = array( 'status' => 'error', 'description'=>'File uploaded successfully','data'=>$_REQUEST );
            //$json = json_encode( $answer );

            //echo $json;
            return false;
        }
    }

}

