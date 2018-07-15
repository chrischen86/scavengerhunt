﻿using ScavengerHunt.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ScavengerHunt
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();

            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.Add(config.Formatters.JsonFormatter);
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "SpecificActionApi",
                routeTemplate: "api/{controller}/{action}/{id}"
            );
        }
    }
}
