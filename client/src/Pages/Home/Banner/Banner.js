import React from 'react';


const Banner = () => {
    return (
        // <!-- component -->
<div className=" bg-gray-50 flex items-center ">
    
	<section className="w-full bg-cover bg-center py-32" style={{backgroundImage:'url(https://t4.ftcdn.net/jpg/03/50/81/89/240_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg)',backgroundSize: 'cover',}}  >
		<div className="container mx-auto text-center text-white" style={{color:'#fff'}}>
			<h1 className="text-5xl font-medium mb-6"> <span className="text-workout-primary"> TIME </span>TO <br></br>GET <span className="text-workout-primary">Fit</span> </h1>
			<p className="text-xl mb-12 w-66 text-center mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio,
				gravida pellentesque urna varius vitae.</p>
			<a href="#" className="bg-workout-primary text-workout-secondary py-4 px-12 rounded-full hover:bg-indigo-600">Demo</a>
		</div>
	</section>
</div>
    );
};

export default Banner;