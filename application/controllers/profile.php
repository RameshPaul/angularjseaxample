<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index($userID)
    {
        $data['userID'] = $userID;
        $this->load->view('headerView');
        $this->load->view('profileView', $data);
        $this->load->view('footerView');
    }

    public function profileinfo(){
        $userID = $_REQUEST['userID'];

        //PREPARE DATA MODEL FOR
        $dataModel = array();
        $dataModel['USERID'] = $userID;
        //print_r($dataModel);
        $this->load->model('profilemodel');
        $res = $this->profilemodel->getUserData($dataModel);

        if($res){
            echo json_encode(array("status"=>"success", "description"=>"login done successfully", "data"=>$res[0]));
        }
        else{
            echo json_encode(array("status"=>"error", "description"=>"user details not found"));
        }

        //print_r($registrationJSON);
    }

    function updateuserdata(){
        if(isset($_REQUEST['profile'])){
            $data = json_decode($_REQUEST['profile']);
            $registrationJSON['name'] = $data->name;
            $registrationJSON['email'] = $data->email;
            $registrationJSON['password'] = $data->password;
            $registrationJSON['phone'] = $data->phone;
            $registrationJSON['address'] = $data->address;
            $registrationJSON['userID'] = $_REQUEST['userID'];
            $upload['location'] = $data->photo;
            $this->updateuserprofile($registrationJSON, $upload);
        }else{
            $upload = $this->uploadfile();
            if($upload['status'] === 'success'){
                $registrationJSON = $_REQUEST;//json_decode($_REQUEST['registration']);
                $this->updateuserprofile($registrationJSON, $upload);
            }else{
                $answer = array( 'status' => 'error', 'description'=>'File uploaded successfully','data'=>$_REQUEST );
                $json = json_encode( $answer );

                echo $json;
            }
        }
    }

    function updateuserprofile($registrationJSON, $upload){
        //PREPARE DATA MODEL FOR
        //print_r($registrationJSON);
        //print_r($upload);
        //exit;
        $dataModel = array();
        $dataModel['NAME'] = $registrationJSON['name'];
        $dataModel['EMAIL'] = $registrationJSON['email'];
        $dataModel['PASSWORD'] = $registrationJSON['password'];
        $dataModel['PHONE_NUM'] = $registrationJSON['phone'];
        $dataModel['ADDRESS'] = $registrationJSON['address'];
        $dataModel['PHOTO_LOCATION'] = $upload['location'];

        $userID = $registrationJSON['userID'];
        $photoLocation =  array("location"=>$upload['location']);

        $this->load->model('profilemodel');
        $userID = $this->profilemodel->updateUserData($dataModel, $userID);
        //print_r($res->db->inser_id());

        if($userID){
            echo json_encode(array("status"=>"success", "description"=>"User details updated successfully", "data"=> $photoLocation, "Ary"=>$dataModel));
        }
        else{
            echo json_encode(array("status"=>"error", "description"=>"user details not found to update", "data"=>$photoLocation, "Ary"=>$dataModel));
        }
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

