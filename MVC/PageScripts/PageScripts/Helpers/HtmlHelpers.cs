using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PageScripts.Helpers
{
    public static class HtmlHelpers
    {
        public static MvcHtmlString JsPage(this HtmlHelper helper)
        {
            var pageNameViewData = helper.ViewContext.ViewData["JsComponent"];
            var pageName = pageNameViewData != null
                               ? pageNameViewData.ToString()
                               : helper.ViewContext.RouteData.GetRequiredString("controller");

            return new MvcHtmlString(pageName);
        }
    }
}