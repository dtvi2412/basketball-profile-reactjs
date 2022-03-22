import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form as FormF, Field } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { updateAvatar, updateProfile, uploadLogoTeam } from '../store/core';
import Loading from './Loading';
import { TIMEOUT_ANIMATION_LOADING } from '../util/contants';
import { storage } from '../firebaseConfig';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';

//Validation
const formSchema = yup.object().shape({
  firstName: yup.string().min(2, 'Too Short!').max(24, 'Too Long!').required(),
  lastName: yup.string().min(2, 'Too Short!').max(24, 'Too Long!').required(),
  numberShirt: yup.number().min(0).max(99).required(),
  height: yup.number().min(50).max(250).required(),
  weight: yup.number().min(10).max(300).required(),
  logoTeam: yup.string().required(),
  nameTeam: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
  abbreviated: yup
    .string()
    .min(2, 'Too Short!')
    .max(34, 'Too Long!')
    .required(),
  born: yup.date().required(),
  from: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
  debut: yup.date().required(),

  previously: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
  avatar: yup.string(),
  points: yup.number().min(0).max(100, 'Are you serious?').required(),
  rebounds: yup.number().min(0).max(100, 'Are you serious?').required(),
  assists: yup.number().min(0).max(100, 'Are you serious?').required(),
  position: yup.string().max(5, 'Too Long!').required(),
});

const Form = ({ setIsOpenForm }) => {
  //Destructuring
  const {
    content: {
      firstName,
      lastName,
      logoTeam,
      nameTeam,
      numberShirt,
      abbreviated,
      weight,
      height,
      position,
    },
    profile: { born, from, debut, previously },
    score: { points, rebounds, assists },
    avatar,
  } = useSelector((state) => state.core);

  const [isLoading, setIsLoading] = useState(false);
  const [isContentForm, setIsContentForm] = useState(true);

  const [isProgress, setIsProgress] = useState(false);
  const [uploadProgress, setUploadProgess] = useState(0);

  const fakeWaitingTimeOutRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    //Clean up
    return () => clearTimeout(fakeWaitingTimeOutRef.current);
  }, []);

  const todayRef = useRef(new Date().toISOString().slice(0, 10));

  //hanlde Upload file firebase
  const uploadFiles = (file, name) => {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setIsProgress(true);
        setUploadProgess(prog);
      },
      (err) => {
        console.log(err);
        setIsOpenForm(false);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setIsProgress(false);
          if (name === 'avatar') {
            dispatch(updateAvatar({ avatar: url }));
            setIsOpenForm(false);
            setIsLoading(false);
          }
          if (name === 'logoTeam') {
            dispatch(uploadLogoTeam({ logoTeam: url }));
            setIsOpenForm(false);
            setIsLoading(false);
          }
        });
      }
    );
  };

  return (
    <div
      onClick={() => setIsOpenForm(false)}
      className="bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[101]"
    >
      {/* Content Form  */}
      {isContentForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-[50%] w-[550px] bg-[#DFDAF8] rounded-xl text-center p-4"
        >
          <h1 className="font-bold text-2xl uppercase text-[#872A82] ">
            Edit Profile
          </h1>
          <Formik
            initialValues={{
              firstName,
              lastName,
              numberShirt,
              weight,
              height,
              position,
              logoTeam,
              nameTeam,
              abbreviated,
              born,
              from,
              debut,
              previously,
              avatar,
              points,
              rebounds,
              assists,
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              //Destructoring
              const {
                //Content
                firstName,
                lastName,
                logoTeam,
                nameTeam,
                numberShirt,
                abbreviated,
                height,
                weight,
                position,
                //Profile
                born,
                from,
                debut,
                previously,
                //Score
                points,
                rebounds,
                assists,
                //avatar
                avatar,
              } = values;

              //Upload image firebase
              // if (typeof avatar === 'object') {
              //   uploadFiles(avatar, 'avatar');
              // }
              // if (typeof logoTeam === 'object') {
              //   uploadFiles(logoTeam, 'logoTeam');
              // }

              // if (typeof avatar === 'string' && typeof logoTeam === 'string') {
              //   // Fake Waiting
              //   fakeWaitingTimeOutRef.current = setTimeout(() => {
              //     setIsOpenForm(false);
              //     setIsLoading(false);
              //   }, TIMEOUT_ANIMATION_LOADING);
              // }

              //Create Object Send Reducer
              const content = {
                firstName,
                lastName,
                logoTeam:
                  typeof logoTeam === 'object'
                    ? URL.createObjectURL(logoTeam)
                    : logoTeam,
                nameTeam,
                numberShirt,
                abbreviated,
                height,
                weight,
                position,
              };

              const profile = {
                born,
                from,
                debut,
                previously,
              };
              const score = {
                points,
                rebounds,
                assists,
              };

              setIsContentForm(false);
              setIsLoading(true);

              dispatch(
                updateProfile({
                  content,
                  profile,
                  score,
                  avatar:
                    typeof avatar === 'object'
                      ? URL.createObjectURL(avatar)
                      : avatar,
                })
              );

              fakeWaitingTimeOutRef.current = setTimeout(() => {
                setIsOpenForm(false);
                setIsLoading(false);
              }, TIMEOUT_ANIMATION_LOADING);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <FormF className="flex flex-wrap items-center justify-between overflow-x-hidden">
                {/* Hafl Col  */}
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">First name</label>
                  <Field
                    name="firstName"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Last name</label>
                  <Field
                    name="lastName"
                    className="rounded-lg w-full py-1 px-2"
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.lastName}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 ">
                  <label className="text-[0.8rem] ">Position</label>
                  <Field
                    as="select"
                    name="position"
                    className="rounded-lg w-full py-1 px-2"
                  >
                    <option value="PG">PG</option>
                    <option value="SG">SG</option>
                    <option value="SF">SF</option>
                    <option value="PF">PF</option>
                    <option value="C">C</option>
                  </Field>
                  {errors.position && touched.position ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.position}
                    </div>
                  ) : null}
                </div>
                {/* Full Col */}
                <div className="w-full flex flex-col items-start mb-2">
                  <label className="text-[0.8rem] ">Number T shirt</label>
                  <Field
                    type="number"
                    min="0"
                    max="100"
                    className="rounded-lg w-full py-1 px-2"
                    name="numberShirt"
                  />
                  {errors.numberShirt && touched.numberShirt ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.numberShirt}
                    </div>
                  ) : null}
                </div>
                {/* Hafl Col  */}
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Height</label>
                  <Field
                    type="number"
                    name="height"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.height && touched.height ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.height}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Weight</label>
                  <Field
                    name="weight"
                    type="number"
                    className="rounded-lg w-full py-1 px-2"
                  />
                  {errors.weight && touched.weight ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.weight}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Logo team</label>
                  <input
                    type="file"
                    name="logoTeam"
                    className="rounded-lg w-full py-1 px-2"
                    onChange={(e) => {
                      setFieldValue('logoTeam', e.target.files[0]);
                    }}
                  />
                  {errors.logoTeam && touched.logoTeam ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.logoTeam}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 ">
                  <label className="text-[0.8rem] ">Full team name</label>
                  <Field
                    name="nameTeam"
                    className="rounded-lg w-full py-1 px-2"
                  />
                  {errors.nameTeam && touched.nameTeam ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.nameTeam}
                    </div>
                  ) : null}
                </div>
                {/* Full Col */}
                <div className="w-full flex flex-col items-start mb-2">
                  <label className="text-[0.8rem] ">
                    Abbreviated team name
                  </label>
                  <Field
                    name="abbreviated"
                    className="rounded-lg w-full py-1 px-2"
                  />
                  {errors.abbreviated && touched.abbreviated ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.abbreviated}
                    </div>
                  ) : null}
                </div>
                {/* Hafl Col  */}
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Born</label>
                  <Field
                    min="1960-01-01"
                    max={todayRef.current}
                    name="born"
                    type="date"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.born && touched.born ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.born}
                    </div>
                  ) : null}
                </div>

                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">From</label>
                  <Field name="from" className="rounded-lg w-full  py-1 px-2" />
                  {errors.from && touched.from ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.from}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Debut</label>
                  <Field
                    min="1960-01-01"
                    max={todayRef.current}
                    type="date"
                    name="debut"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.debut && touched.debut ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.debut}
                    </div>
                  ) : null}
                </div>

                <div className="w-full flex flex-[1] flex-col items-start mb-2">
                  <label className="text-[0.8rem] ">Previously</label>
                  <Field
                    name="previously"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.previously && touched.previously ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.previously}
                    </div>
                  ) : null}
                </div>

                {/* Full Col */}
                <div className="w-full flex flex-col items-start mb-2">
                  <label className="text-[0.8rem] ">Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    onChange={(e) => {
                      setFieldValue('avatar', e.target.files[0]);
                    }}
                    className="rounded-lg w-full py-1 px-2"
                  />
                  <span className="text-yellow-500 ">
                    *Note: You should take your photos apart before you put them
                    in
                  </span>
                  {errors.avatar && touched.avatar ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.avatar}
                    </div>
                  ) : null}
                </div>
                {/* Hafl Col  */}
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Points</label>
                  <Field
                    name="points"
                    type="number"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.points && touched.points ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.points}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 mr-1">
                  <label className="text-[0.8rem] ">Rebounds</label>
                  <Field
                    name="rebounds"
                    type="number"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.rebounds && touched.rebounds ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.rebounds}
                    </div>
                  ) : null}
                </div>
                <div className="w-full flex flex-[1] flex-col items-start mb-2 ">
                  <label className="text-[0.8rem] ">Assists</label>
                  <Field
                    name="assists"
                    type="number"
                    className="rounded-lg w-full  py-1 px-2"
                  />
                  {errors.assists && touched.assists ? (
                    <div className="text-red-500 mt-1 text-[0.7rem] m-0">
                      {errors.assists}
                    </div>
                  ) : null}
                </div>
                {/* Full Col */}
                <div className="w-full mt-4">
                  <button
                    type="submit"
                    className="font-bold text-white text-center bg-[#90258D] py-2 px-6 rounded-lg"
                  >
                    Update
                  </button>
                </div>
              </FormF>
            )}
          </Formik>
        </motion.div>
      )}

      {isLoading && (
        <Loading isProgress={isProgress} uploadProgress={uploadProgress} />
      )}
    </div>
  );
};

export default Form;
